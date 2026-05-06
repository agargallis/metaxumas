const homePhotoAccentPalette = [
  'linear-gradient(145deg, rgba(237,196,141,0.92), rgba(250,237,214,0.94))',
  'linear-gradient(145deg, rgba(208,168,126,0.92), rgba(248,229,205,0.94))',
  'linear-gradient(145deg, rgba(225,171,145,0.92), rgba(247,223,208,0.94))',
  'linear-gradient(145deg, rgba(229,191,156,0.92), rgba(250,235,217,0.94))',
]

export function createDefaultPageMedia() {
  return {
    homePhotos: [
      {
        id: 'home-photo-1',
        title: 'Γωνιά του χώρου',
        caption: 'Χώρος για ήσυχο καφέ και χαλαρή πρώτη στάση της ημέρας.',
        image: 'https://i.imgur.com/bHlj9oV.png',
      },
      {
        id: 'home-photo-2',
        title: 'Άλλη μια ματιά στον χώρο',
        caption: 'Μια ακόμη γωνιά του μαγαζιού με την ίδια ζεστή αίσθηση.',
        image: 'https://i.imgur.com/nnzjjl2.jpeg',
      },
      {
        id: 'home-photo-3',
        title: 'Άλλη μια ματιά στον χώρο',
        caption: 'Μια ακόμη γωνιά του μαγαζιού με την ίδια ζεστή αίσθηση.',
        image: 'https://i.imgur.com/5xfKHqf.png',
      },
      {
        id: 'home-photo-4',
        title: 'Ατμόσφαιρα για παρέα',
        caption: 'Σημείο που δένει με κουβέντα, κρασί και πιο ζεστή ατμόσφαιρα.',
        image: 'https://i.imgur.com/FhSCDfn.jpeg',
      },
      {
        id: 'home-photo-5',
        title: 'Στιγμή από βραδιά',
        caption: 'Η βραδινή πλευρά του μαγαζιού, πιο ζωντανή αλλά πάντα οικεία.',
        image: 'https://i.imgur.com/v6W3C6c.png',
      },
      {
        id: 'home-photo-6',
        title: 'Άλλη μια ματιά στον χώρο',
        caption: 'Μια ακόμη γωνιά του μαγαζιού με την ίδια ζεστή αίσθηση.',
        image: 'https://i.imgur.com/1d0giQl.jpeg',
      },
    ],
    liveMusicPhotos: {
      friday: [
        { id: 'friday-photo-1', image: 'https://i.imgur.com/lHVVHTo.png' },
        { id: 'friday-photo-2', image: 'https://i.imgur.com/S5UEnDn.jpeg' },
        { id: 'friday-photo-3', image: 'https://i.imgur.com/z5mpbxn.jpeg' },
        { id: 'friday-photo-4', image: 'https://i.imgur.com/OPAUEIc.png' },
        { id: 'friday-photo-5', image: 'https://i.imgur.com/iccX5CT.png' },
        { id: 'friday-photo-6', image: 'https://i.imgur.com/ciaBmIK.jpeg' },
      ],
      saturday: [
        { id: 'saturday-photo-1', image: 'https://i.imgur.com/G9RVW7J.png' },
        { id: 'saturday-photo-2', image: 'https://i.imgur.com/6OLa6lR.jpeg' },
        { id: 'saturday-photo-3', image: 'https://i.imgur.com/CzZ08N8.jpeg' },
        { id: 'saturday-photo-4', image: 'https://i.imgur.com/60od61a.jpeg' },
        { id: 'saturday-photo-5', image: 'https://i.imgur.com/QY4uORh.png' },
      ],
      sunday: [
        { id: 'sunday-photo-1', image: 'https://i.imgur.com/fSMSMbN.png' },
        { id: 'sunday-photo-2', image: 'https://i.imgur.com/Apq0MyJ.jpeg' },
        { id: 'sunday-photo-3', image: 'https://i.imgur.com/QptOIAp.jpeg' },
        { id: 'sunday-photo-4', image: 'https://i.imgur.com/6HWXBEX.jpeg' },
        { id: 'sunday-photo-5', image: 'https://i.imgur.com/h5AdrQB.png' },
      ],
    },
  }
}

function normalizePhotoItem(item, fallbackId, fallbackTitle, fallbackCaption = '') {
  if (typeof item === 'string') {
    return {
      id: fallbackId,
      image: item,
      title: fallbackTitle,
      caption: fallbackCaption,
    }
  }

  return {
    id: item?.id || fallbackId,
    image: item?.image || '',
    title: item?.title || fallbackTitle,
    caption: item?.caption || fallbackCaption,
  }
}

function normalizePhotoList(items, prefix, baseTitle, fallbackCaption = '') {
  return (Array.isArray(items) ? items : [])
    .map((item, index) => normalizePhotoItem(item, `${prefix}-${index + 1}`, `${baseTitle} ${index + 1}`, fallbackCaption))
    .filter(item => item.image)
}

export function normalizePageMedia(input = {}) {
  const fallback = createDefaultPageMedia()
  const hasHomePhotos = Array.isArray(input.homePhotos)
  const hasFridayPhotos = Array.isArray(input.liveMusicPhotos?.friday)
  const hasSaturdayPhotos = Array.isArray(input.liveMusicPhotos?.saturday)
  const hasSundayPhotos = Array.isArray(input.liveMusicPhotos?.sunday)

  const homePhotos = normalizePhotoList(
    hasHomePhotos ? input.homePhotos : fallback.homePhotos,
    'home-photo',
    'Φωτογραφία χώρου',
    'Στιγμιότυπο από τον χώρο μας.'
  )

  return {
    homePhotos: homePhotos.map((item, index) => ({
      ...item,
      accent: item.accent || homePhotoAccentPalette[index % homePhotoAccentPalette.length],
    })),
    liveMusicPhotos: {
      friday: normalizePhotoList(hasFridayPhotos ? input.liveMusicPhotos.friday : fallback.liveMusicPhotos.friday, 'friday-photo', 'Παρασκευή φωτογραφία'),
      saturday: normalizePhotoList(hasSaturdayPhotos ? input.liveMusicPhotos.saturday : fallback.liveMusicPhotos.saturday, 'saturday-photo', 'Σάββατο φωτογραφία'),
      sunday: normalizePhotoList(hasSundayPhotos ? input.liveMusicPhotos.sunday : fallback.liveMusicPhotos.sunday, 'sunday-photo', 'Κυριακή φωτογραφία'),
    },
  }
}

export function buildLiveMusicVisuals(pageMedia) {
  const liveMusicPhotos = normalizePageMedia(pageMedia).liveMusicPhotos

  const buildVisual = (photos, overlay, badge, fallbackImage) => ({
    image: photos[0]?.image || fallbackImage,
    modalImages: photos.length ? photos.map(photo => photo.image) : [fallbackImage].filter(Boolean),
    overlay,
    badge,
  })

  return {
    r1: buildVisual(
      liveMusicPhotos.friday,
      'from-[rgba(120,52,22,0.24)] via-[rgba(60,26,10,0.20)] to-[rgba(38,20,8,0.58)]',
      'Παρασκευή βράδυ',
      'https://i.imgur.com/lHVVHTo.png'
    ),
    r2: buildVisual(
      liveMusicPhotos.saturday,
      'from-[rgba(156,87,35,0.22)] via-[rgba(88,39,16,0.20)] to-[rgba(38,20,8,0.58)]',
      'Σάββατο live',
      'https://i.imgur.com/G9RVW7J.png'
    ),
    r3: buildVisual(
      liveMusicPhotos.sunday,
      'from-[rgba(141,82,55,0.24)] via-[rgba(76,37,19,0.22)] to-[rgba(38,20,8,0.58)]',
      'Κυριακάτικη παρέα',
      'https://i.imgur.com/fSMSMbN.png'
    ),
  }
}
