
import Common from "./common"

export default class SyncHost{


    constructor(mp,pv){


        this.moveTimeout;
        this.zoomTimeout

        this.stopMoveInSeconds = 100;
        

        this.lastcamera = {}

        this.mp = mp
        this.pv = pv

        this.isAllowSendCamera = true


        this.init()

    




    }


    init(){


        this.mp.on("cameraChange",e=>{


           


            if (e.mode == "mode.transitioning") return





            this.lastcamera = e




            clearTimeout(this.moveTimeout)

            this.moveTimeout = setTimeout(()=>{

                console.log(this.lastcamera)

                const data = {}
                data.key = 'map'
                data.subkey = 'camera'
                data.content = this.lastcamera

                this.pv.sendMsg(data)

            },this.stopMoveInSeconds)



         })


         this.mp.on("zoomChange",e=>{

            clearTimeout(this.zoomTimeout)

            this.zoomTimeout = setTimeout(()=>{
                console.log("zoomChange",e)

                const data = {}
                data.key = 'map'
                data.subkey = 'zoom'
                data.content = e
    
                this.pv.sendMsg(data)


            },this.duration)




         })



         this.mp.on("floorChange",e=>{

            console.log("floor change",e)


            if (!e.sequence ) return

            const data = {}
            data.key = 'map'
            data.subkey = 'floor'
            data.content = e

            this.pv.sendMsg(data)


         })












    }








}