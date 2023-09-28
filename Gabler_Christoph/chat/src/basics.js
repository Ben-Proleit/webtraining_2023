/*
document.addEventListener('DOMContentLoaded', () => {
    reloadLanguage();
});
 */

var htmlCache = [];
var blobCache = [];
var jsonCache = [];

var socket = undefined;

function getCookie(name) {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim().split("=");
    if (cookie[0].trim() === name) {
      return cookie[1].trim();
    }
  }
  return "en";
}

function replaceMultiple(subject, replace) {
  if (replace !== undefined && Array.isArray(replace) && replace.length > 0) {
    if (!Array.isArray(replace[0]) && replace.length >= 2) {
      subject = subject.replaceAll(replace[0], replace[1]);
    } else {
      for (let i = 0; i < replace.length; i++) {
        if (Array.isArray(replace[i]) && replace[i].length >= 2) {
          subject = subject.replaceAll(replace[i][0], replace[i][1]);
        }
      }
    }
  }
  return subject;
}

function fetchJSON(url, onData = undefined, onError = undefined) {
  //check if the desired json was already cached
  let pos = isCached(jsonCache, url);
  if (pos >= 0) {
    //directly execute the callback from the cache
    if (onData !== undefined) {
      onData(jsonCache[pos][1]);
    }
  } else {
    fetch(url).then((response) => {
      if (!response.ok) {
        if (onError !== undefined) {
          onError(response.status);
        }
      } else {
        return response.json();
      }
    }).then((json) => {
      if (json !== undefined) {
        //push the json into the cache
        jsonCache.push([url, json]);
        //execute the callback
        if (onData !== undefined) {
          onData(json);
        }
      }
    });
  }
}

function fetchBlob(url, onData = undefined, onError = undefined) {
  //check if the desired blob was already cached
  let pos = isCached(blobCache, url);
  if (pos >= 0) {
    //directly execute the callback from the cache
    if (onData !== undefined) {
      onData(blobCache[pos][1]);
    }
  } else {
    fetch(url).then((response) => {
      if (!response.ok) {
        if (onError !== undefined) {
          onError(response.status);
        }
      } else {
        return response.blob();
      }
    }).then((blob) => {
      if (blob !== undefined) {
        //push the blob into the cache
        blobCache.push([url, blob]);
        //execute the callback
        if (onData !== undefined) {
          onData(blob);
        }
      }
    });
  }
}

function fetchHTML(url, onData = undefined, onError = undefined) {
  //check if the desired page was already cached
  let pos = isCached(htmlCache, url);
  if (pos >= 0) {
    //directly execute the callback from the cache
    if (onData !== undefined) {
      onData(htmlCache[pos][1]);
    }
  } else {
    fetch(url).then((response) => {
      if (!response.ok) {
        if (onError !== undefined) {
          onError(response.status);
        }
      } else {
        return response.text();
      }
    }).then((page) => {
      if (page !== undefined) {
        //push the page into the cache
        htmlCache.push([url, page]);
        //execute the callback
        if (onData !== undefined) {
          onData(page);
        }
      }
    });
  }
}

function addCss(fileName) {
  let head = document.head;
  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;
  head.appendChild(link);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function href(File) {
  window.location.href = File;
}

function isCached(cache, path) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === path) {
      return i;
    }
  }
  return -1;
}


class SList {
  constructor(target) {
    //init the listeners
    this.onSwap = [];

    // (A) SET CSS + GET ALL LIST ITEMS
    let items = target.children, current = null;

    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
      // (B1) ATTACH DRAGGABLE
      i.draggable = true;

      // (B2) DRAG START - YELLOW HIGHLIGHT DROP ZONES
      i.ondragstart = (ev) => {
        current = i;
        for (let it of items) {
          if (it !== current) {
            it.classList.add("bg-opacity-10");
            it.classList.add("bg-secondary");
          }
        }
      };

      // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
      i.ondragenter = (ev) => {
        if (i !== current) {
          i.classList.remove("bg-opacity-10");
          i.classList.add("bg-opacity-25");
        }
      };

      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      i.ondragleave = () => {
        i.classList.remove("bg-opacity-25");
        i.classList.add("bg-opacity-10");
      };

      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      i.ondragend = () => {
        for (let it of items) {
          it.classList.remove("bg-opacity-10");
          it.classList.remove("bg-opacity-25");
          it.classList.remove("bg-secondary");
        }
      };

      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      i.ondragover = (evt) => { evt.preventDefault(); };

      // (B7) ON DROP - DO SOMETHING
      i.ondrop = (evt) => {
        evt.preventDefault();
        if (i !== current) {
          let currentpos = 0, droppedpos = 0;
          for (let it = 0; it < items.length; it++) {
            if (current === items[it]) { currentpos = it; }
            if (i === items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
          }
          //execute callbacks
          for (let handler of this.onSwap) {
            handler(currentpos, droppedpos);
          }
        }
      };
    }
  }
}