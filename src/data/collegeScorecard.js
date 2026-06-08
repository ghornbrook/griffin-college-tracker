const API_KEY = 'SJ36wqPAWgYet5vmtpKXR0okDfYM74gyVn7NO1k6'
const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools'

const FIELDS = [
  'id',
  'school.name',
  'school.city',
  'school.state',
  'school.ownership',
  'school.locale',
  'latest.admissions.admission_rate.overall',
  'latest.admissions.sat_scores.25th_percentile.critical_reading',
  'latest.admissions.sat_scores.75th_percentile.critical_reading',
  'latest.admissions.sat_scores.25th_percentile.math',
  'latest.admissions.sat_scores.75th_percentile.math',
  'latest.admissions.act_scores.25th_percentile.cumulative',
  'latest.admissions.act_scores.75th_percentile.cumulative',
  'latest.student.size',
  'latest.cost.tuition.out_of_state',
  'latest.cost.tuition.in_state',
  'latest.completion.completion_rate_4yr_150nt',
  'latest.student.faculty_ratio',
].join(',')

function localeToSetting(locale) {
  if (!locale) return 'Suburban'
  if (locale >= 11 && locale <= 13) return 'Urban'
  if (locale >= 21 && locale <= 23) return 'Suburban'
  if (locale >= 31 && locale <= 33) return 'Small Town'
  if (locale >= 41 && locale <= 43) return 'Rural (college town)'
  return 'Suburban'
}

function ownershipToType(ownership) {
  if (ownership === 1) return 'Public Research'
  if (ownership === 2) return 'Private Research'
  if (ownership === 3) return 'Private For-Profit'
  return 'Private Research'
}

function formatPercent(rate) {
  if (rate == null) return ''
  return `${Math.round(rate * 100)}%`
}

function formatSATRange(school) {
  const cr25 = school['latest.admissions.sat_scores.25th_percentile.critical_reading']
  const cr75 = school['latest.admissions.sat_scores.75th_percentile.critical_reading']
  const m25 = school['latest.admissions.sat_scores.25th_percentile.math']
  const m75 = school['latest.admissions.sat_scores.75th_percentile.math']
  if (!cr25 || !cr75 || !m25 || !m75) return ''
  return `${cr25 + m25}-${cr75 + m75}`
}

function formatACTRange(school) {
  const act25 = school['latest.admissions.act_scores.25th_percentile.cumulative']
  const act75 = school['latest.admissions.act_scores.75th_percentile.cumulative']
  if (!act25 || !act75) return ''
  return `${act25}-${act75}`
}

function formatTuition(school) {
  const amount = school['latest.cost.tuition.out_of_state'] || school['latest.cost.tuition.in_state']
  if (!amount) return ''
  return `$${amount.toLocaleString()}`
}

function formatGradRate(rate) {
  if (rate == null) return ''
  return `${Math.round(rate * 100)}%`
}

function formatFacultyRatio(ratio) {
  if (!ratio) return ''
  return `${Math.round(ratio)}:1`
}

export async function searchCollegeScorecard(query) {
  if (!query || query.length < 2) return []

  const params = new URLSearchParams({
    api_key: API_KEY,
    'school.name': query,
    _fields: FIELDS,
    _per_page: 8,
    _sort: 'latest.student.size:desc',
  })

  const res = await fetch(`${BASE_URL}?${params}`)
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`)
  const json = await res.json()

  return (json.results || []).map(school => ({
    id: school.id,
    displayName: school['school.name'],
    displayLocation: `${school['school.city']}, ${school['school.state']}`,
    name: school['school.name'],
    location: `${school['school.city']}, ${school['school.state']}`,
    type: ownershipToType(school['school.ownership']),
    setting: localeToSetting(school['school.locale']),
    acceptanceRate: formatPercent(school['latest.admissions.admission_rate.overall']),
    satRange: formatSATRange(school),
    actRange: formatACTRange(school),
    undergradEnrollment: school['latest.student.size'] || '',
    tuition: formatTuition(school),
    gradRate: formatGradRate(school['latest.completion.completion_rate_4yr_150nt']),
    studentFacultyRatio: formatFacultyRatio(school['latest.student.faculty_ratio']),
    rank: '',
    totalEnrollment: '',
    greekLife: '',
    athletics: '',
    topPrograms: '',
    knownFor: '',
  }))
}
