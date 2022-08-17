/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = { "/": "/", "deepl": "https://deepl.com/", "reddit": "https://reddit.com/", "maps": "https://maps.google.com/" }
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    "id": "VkOKtG5LkEDc5B8Y",
    "label": "dev",
    "bookmarks": [
      { "id": "TlngUh3SpUVQUcDC", "label": "figma", "url": "https://www.figma.com/" },
      { "id": "ti3eYvHWXRXfuNeL", "label": "ui goodies", "url": "https://www.uigoodies.com/" },
      { "id": "qu1ZA97He8KtjqnV", "label": "leetcode", "url": "https://leetcode.com/problemset/all/" },
      { "id": "cc6f3d1936c074e58ea6e2a43a36264e", "label": "github", "url": "https://github.com/" },
    ]
  },
  {
    "id": "DmILMzCG5lte7zdR",
    "label": "school",
    "bookmarks": [
      { "id": "asLe5XQQMd5X0GcX", "label": "canvas", "url": "https://login.vt.edu/profile/cas/login?execution=e1s1" },
      { "id": "s1yyMX8eaMo5DECd", "label": "checksheet", "url": "https://www.registrar.vt.edu/content/dam/registrar_vt_edu/documents/Updates/coe/21-22/coe_cs_21_22.pdf" },
      { "id": "ohDvXO8npBvfanK0", "label": "google drive", "url": "https://drive.google.com/drive/my-drive" },
      { "id": "a8cd22a4f276ecf8b4ab826a6a15b824", "label": "gmail", "url": "https://mail.google.com/mail/u/0/" },
    ]
  }
]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
