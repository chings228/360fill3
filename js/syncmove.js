
import Notification from "./notification";
import MpMap from "./mpmap";





export default class SyncMove extends Notification{



    mpMap
    peervideo
    param


    synchost
    syncguest


    submodule 



  
    peervideopath = 'https://peervideodev.1328.hk/2.0/js/class/peervideo.js'

    // peervideopath = "https://cdn.jsdelivr.net/gh/chings228/peervideochat@master/1.0/js/class/peervideo.js"

    constructor(param){


        super()

        this.param = param 

        this.isAllowSendCamera = true

        this.isMoveDone = true

        this.requestVideoBtn = $("#requestVideoBtn")


        this.initbtn()

        this.initSdk()


 

    }


    initbtn(){


       this.requestVideoBtn.click(e=>{


            this.requestVideo()


        })
    }




    requestVideo(){

        this.peervideo.startVideo()

        const data = {}
        data.content = 'requestVideo'
        data.key = 'admin'
    
        console.log(data)
    
        this.peervideo.sendMsg(data)


    }







    initSdk(){


        /// for test usage 

        this.connectPeerConnect()


        return;


        this.mpMap = new MpMap(this.param.isHost)


        this.mpMap.connectSdk()


        this.mpMap.on("sdksuccess",()=>{

            console.log("sdkscucess")
       
                    
            this.connectPeerConnect()

        })



    }



    connectPeerConnect(){

      

        import(this.peervideopath).then(({default:m}) => {

            console.log(this.param)

            this.peervideo =  new m(this.param,e=>{


                console.log(this.peervideo)
                console.log(e)


                this.addPeerVideoListener()



                // test , no map involved
               // this.connectGuestHostModule(this.mpMap,this.peervideo)




            })

        });


    }


    addPeerVideoListener(){


        this.peervideo.on("incomingconnection",e=>{

            console.log("incoming connection")

            this.setRequestVideoBtn(true)
        })


        this.peervideo.on("connected",e=>{


            console.log(this.param)
            console.log("connected")

            this.setRequestVideoBtn(true)
        })


        this.peervideo.on("incomingdata",e=>{

            //console.log(e)
    
    
            this.handleText(e)
    
        })



    }



    handleText(e){

        if (e.key == 'admin'){


            if (e.content = 'requestVideo'){


                this.peervideo.startVideo()
            }




        }
        else{

            if (e.key == 'map' && !this.param.isHost){


                this.submodule.incomingdata(e) 


            }



        }


    }




    setRequestVideoBtn(){

        if (this.param.isHost){

            this.requestVideoBtn.css("display","block")
        }



    }




    connectGuestHostModule(mpMap,peerVideo){

        let path = "./synchost.js"

        if (!this.param.isHost){
            path = "./syncguest.js"
        }

        import(path).then(({default:m})=>{


           this.submodule =  new m(mpMap,peerVideo)

        })


    }





}