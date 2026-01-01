
import Notification from "./notification";
import MpMap from "./mpmap";





export default class SyncMove extends Notification{



    mpMap
    peervideo
    param


    synchost
    syncguest

  
    peervideopath = 'https://peervideodev.1328.hk/2.0/js/class/peervideo.js'

    // peervideopath = "https://cdn.jsdelivr.net/gh/chings228/peervideochat@master/1.0/js/class/peervideo.js"

    constructor(param){


        super()

        this.param = param 

        this.isAllowSendCamera = true

        this.isMoveDone = true


        this.initSdk()

    }


    initSdk(){


        this.mpMap = new MpMap(this.param.isHost)
        this.mpMap.connectSdk()


        this.mpMap.on("sdksuccess",()=>{

            console.log("sdkscucess")
       
                    
            import(this.peervideopath).then(({default:m}) => {
                this.peervideo =  new m(this.param,e=>{


                    console.log(this.peervideo)
                    console.log(e)


                    let path = "./synchost.js"

                    if (!this.param.isHost){
                        path = "./syncguest.js"
                    }

                    this.peervideo.on("chatconnected",e=>{

                        console.log("chat connected")
                    })


                    import(path).then(({default:m})=>{


                        new m(this.mpMap,this.peervideo)

                    })

                })

            });

        })



    }





}