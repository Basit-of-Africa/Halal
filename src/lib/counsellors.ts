export type Counsellor = {
  id: string;
  name: string;
  location: string;
  country: string;
  website: string;
  description: string;
  specialties: string[];
};

export const counsellors: Counsellor[] = [
  {
    id: 'ng-1',
    name: "Al-Mu'minaat Social Advocacy Center (ASAC)",
    location: 'Lagos / National',
    country: 'Nigeria',
    website: 'https://almuminaat.org',
    description: 'Provides Islamic-based family counseling, dispute resolution, and social advocacy for Muslim women and families in Nigeria.',
    specialties: ['Marital Mediation', 'Women Rights', 'Family Advocacy'],
  },
  {
    id: 'ng-2',
    name: 'MPAC Nigeria (Couples Support)',
    location: 'Lagos / Abuja',
    country: 'Nigeria',
    website: 'https://mpac-ng.org',
    description: 'The Muslim Public Affairs Centre offers guidance and resources for Muslim families facing social and marital challenges.',
    specialties: ['Community Support', 'Family Guidance', 'Conflict Resolution'],
  },
  {
    id: '1',
    name: 'Khalil Center',
    location: 'Global / North America',
    country: 'USA',
    website: 'https://khalilcenter.com',
    description: 'A psychological spiritual wellness center utilizing faith-based psychological interventions rooted in Islamic theology.',
    specialties: ['Marital Therapy', 'Spiritual Care', 'Mental Health'],
  },
  {
    id: '2',
    name: 'Maristan',
    location: 'Global / Online',
    country: 'Global',
    website: 'https://maristan.org',
    description: 'Provides holistic mental health care that is grounded in Islamic traditions and accessible to all.',
    specialties: ['Family Counseling', 'Crisis Support', 'Education'],
  },
  {
    id: '3',
    name: 'The Muslim Family Services',
    location: 'North America / Online',
    country: 'USA',
    website: 'https://muslimfamilyservices.org',
    description: 'Dedicated to strengthening the Muslim family unit through professional social services and counseling.',
    specialties: ['Marriage Mediation', 'Domestic Harmony', 'Youth Support'],
  },
  {
    id: '4',
    name: 'Sakoon Counselling',
    location: 'UK / Online',
    country: 'UK',
    website: 'https://sakoon.co.uk',
    description: 'Providing Islamic Counselling and psychotherapy for individuals and couples globally.',
    specialties: ['Couple Therapy', 'Islamic Psychotherapy', 'Mediation'],
  },
  {
    id: '5',
    name: 'Naseeha Mental Health',
    location: 'Global / 24/7 Helpline',
    country: 'Global',
    website: 'https://naseeha.org',
    description: 'An international mental health organization providing immediate peer support and counseling resources.',
    specialties: ['Crisis Intervention', 'Youth & Family', 'Helpline'],
  }
];
