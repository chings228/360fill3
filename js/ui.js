

import SyncMove from "./syncmove";
import Common  from "./common.js"





export default class UI {

    param = {}


    isHost = true
    
    
    peerid
    mid

    // landscape width > height
    isLandscape
    


    constructor(){




        this.mainscreen = $("#mainscreen")
        this.noidscreen = $("#noidscreen")



        this.init()






    }










    init(){



        if (Common.getUrlParameter("hostid")){



            this.isHost = true

            this.pid = Common.getUrlParameter("hostid")

            
            this.connect(this.pid)


        }
        else if (Common.getUrlParameter("guestid")){


            this.isHost = false
            this.pid = Common.getUrlParameter("guestid")

            this.connect(this.pid)

        }


        else{



            this.noidscreen.css("display","block")





        }





        $("#btn_submitid").click(()=>{


            const mid = $("#mid").val()
          
          
            console.log(mid)


            const randomid = Common.makeid(5)


            const pid = `${randomid}${mid}`
          
          
            this.connect(pid)
          
          })
          



    }


    connect(pid){


        console.log(pid)


        const mid = pid.substring(5)


        const url =`https://my.matterport.com/show?m=${mid}&applicationKey=5d408d7eb436459798ebbf6714c81c0d&play=1&qs=1&mt=0&search=0&vr=0`



        console.log(url)
      
      
      
        $("#mainscreen").css("display","block")
        $("#noidscreen").css("display","none")




        /////////////////
        /// reset after css change


        //$("#showcase-iframe").attr('src',url)
      
        ////////////////////////
       
      
        this.peerid = Common.makeid(5)
      
      
      
        this.param.hostdivid  = 'host'
        this.param.guestdivid = 'guest'
        this.param.isHost = this.isHost
        this.param.peerid = pid

        console.log(window.location)

        const origin = window.location.origin




        const hostlink = `${origin}/hostid=${pid}`



        if (this.isHost){

            const guestlink = `${origin}/?guestid=${pid}`

            console.log(guestlink)


            $("#guestidlink").html(guestlink)

            $("#guestlinkdiv").css("display","flex")


            window.history.pushState({},null,`${origin}/?hostid=${pid}`)




            $("#videobtndiv").css("display","block")

        }

 
        
        
      
        new SyncMove(this.param)
       



    }





}