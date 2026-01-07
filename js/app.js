


import UI from "./ui";




function CopyToClipboard(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      alert("Text has been copied, now paste in the text-area")
    }
  }






$(function(){





    bootbox.setDefaults({
        backdrop: "static",
        closeButton: !0,
        centerVertical: !0
    });

    // bootbox.alert('Hello world!', function() {
    //     console.log('Alert Callback');
    // });


    $("#copylink").click(()=>{

            const guestlink = $("#guestidlink").text()

            console.log(guestlink)

            CopyToClipboard('guestidlink')

    })


    new UI()
})

