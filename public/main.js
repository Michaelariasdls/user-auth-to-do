var thumbUp = document.getElementsByClassName("fa-check");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-square");
var crossed = document.querySelectorAll("li.message span:first-child, li.message span:nth-child(2)")


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages/thumbDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbDown':thumbDown
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


Array.from(crossed).forEach(function(element) {
  element.addEventListener('click', function() {
    // Check if parentNode exists
    if (this.parentNode && this.parentNode.childNodes) {
      const name = this.parentNode.childNodes[1] ? this.parentNode.childNodes[1].innerText : 'Name not found';
      const msg = this.parentNode.childNodes[3] ? this.parentNode.childNodes[3].innerText : 'Message not found';
      const isCrossedOut = true;

      if (isCrossedOut) {
        this.parentNode.style.textDecoration = "line-through";
      } else {
        this.parentNode.style.textDecoration = "none";
      }

      fetch('messages', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': name,
          'msg': msg,
          'cross': isCrossedOut
        })
      })
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
    } else {
      console.error('Parent node or child nodes are undefined:', this.parentNode);
    }
  });
});
