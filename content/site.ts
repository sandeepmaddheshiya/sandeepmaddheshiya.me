export const siteConfig = {
  name: 'Sandeep Maddheshiya',
  domain: 'sandeepmaddheshiya.me',
  url: 'https://sandeepmaddheshiya.me',
  title: 'Sandeep Maddheshiya — Builder, Developer, Experimenter',
  description:
    'I build small things on the internet and keep track of what happens. Projects, experiments, failures, and lessons — documented as they happen.',
  version: '1.0',
  lastRedesigned: '04 Oct 2026',
  tagline: 'I build small things on the internet and keep track of what happens.',
  links: {
    github: 'https://github.com/sandeepmaddheshiya', // Update with real URL
    linkedin: 'https://linkedin.com/in/sandeepmaddheshiya', // Update with real URL
    email: 'iam.sandeep.maddheshiya@gmail.com',
  },
  nav: [
    { label: 'Work', href: '/projects' },
    { label: 'Experiments', href: '/experiments' },
    { label: 'Writing', href: '/writing' },
    { label: 'About', href: '/about' },
    { label: 'Now', href: '/now' },
  ] as const,
  secondaryNav: [
    { label: 'Research', href: '/research' },
    { label: 'Failed Projects', href: '/failed-projects' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Changelog', href: '/changelog' },
  ] as const,
}
