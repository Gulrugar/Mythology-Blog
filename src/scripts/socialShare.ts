function facebook(url: string) {
  return `window.open(
    'https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}',
    'facebook-share-dialog',
    'width=626,height=436'
  );`;
}

function pinterest(url: string, mediaUrl: string, description: string) {
  return `
    window.open(
    'https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}&description=${encodeURIComponent(
    description
  )}&media=${encodeURIComponent(mediaUrl)}',
    'pinterest-share-dialog',
    'width=626,height=436'
  );`;
}

function twitter(url: string, text: string) {
  return `window.open(
    'http://twitter.com/share?&url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(
    text
  )}&hashtags=aiart,art,digitalart,generativeart',
    'twitter-share-dialog',
    'width=626,height=436'
  );`;
}

function reddit(url: string, title: string) {
  return `
    window.open(
      'https://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}',
      'reddit-share-dialog',
      'width=900,height=650,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
    );`;
}

function email(url: string, title: string, description: string) {
  return `window.location.href='mailto:?subject=${
    "Shared from " +
    import.meta.env.SITE.replace(/^https:\/\//, "") +
    ": " +
    title
  }&body=${description + " Read More: " + url}'`;
}

export default {
  facebook,
  pinterest,
  twitter,
  reddit,
  email,
};
