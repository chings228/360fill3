

import Notification from "./notification";

import {connect} from 'https://api.matterport.com/sdk/bootstrap/3.0.0-0-g0517b8d76c/sdk.es6.js?applicationKey=5d408d7eb436459798ebbf6714c81c0d'

export default class MpMap extends Notification{


    mpSdk
    isHost
    currentCamera

    constructor(isHost){




        super()

        this.currentCamera = {}
        this.isHost = isHost
        


    }




      async connectSdk() {
            const iframe = document.getElementById('showcase-iframe');
        

            try {
              const mpSdk = await connect(iframe);
        
              console.log("ahh")

              this.mpSdk = mpSdk

              this.appphaseMonitor()

            } catch (e) {

                this.fire("sdkfail",e)
              console.error(e);
              console.log(e)
            }
        }
        


    appphaseMonitor(){


    
        this.mpSdk.App.state.subscribe(appstate=>{


            console.log(appstate)

            if (appstate.phase == 'appphase.playing'){


                console.log("playing")
                this.fire("sdksuccess",'')

                if (this.isHost){


                    this.subscribePointer()
                    this.subscribeCamera()
                    this.subscribeFloor()
                    this.subscribeZoom()

                }


            }



        })



    }



    subscribePointer(){




    }



    subscribeCamera(){

        this.mpSdk.Camera.pose.subscribe(e=>{



                this.fire("cameraChange",e)
          })


    }

    subscribeZoom(){

        this.mpSdk.Camera.zoom.subscribe(e=>{

            
                this.fire("zoomChange",e)
    

 

        })



    }

    subscribeFloor(){


        this.mpSdk.Floor.current.subscribe(e=>{


            console.log(this.currentCamera)

            console.log("floor ",e)


            // if (!this.currentCamera.hasOwnProperty('mode')) return



            if (  this.currentCamera.mode != 'mode.inside'){

                console.log(e)

                 this.fire("floorChange",e)

            }



        })

    }





    moveTo(camera, callback){

        console.log(camera)
  
        const sweepId = camera.sweep
        const rotation = camera.rotation;
        const transition = this.mpSdk.Sweep.Transition.FLY;
        const transitionTime = 1000; // in milliseconds
        
        this.mpSdk.Sweep.moveTo(sweepId, {
            rotation: rotation,
            transition: transition,
            transitionTime: transitionTime,
          })
          .then(sweepId =>{
            // Move successful.
            callback(sweepId);
            //console.log('Arrived at sweep ' + sweepId);
          })
          .catch(err=>{
            // Error with moveTo command

            console.log(err)
          });
  
  
  
      }


      modeTo(camera,zoom,callback){

        let mode
        
        if(camera.mode == "mode.floorplan"){
            zoom = 8;
        }else{
            zoom = 5;
        }


        if(camera.mode == "mode.dollhouse"){
            mode = this.mpSdk.Mode.Mode.DOLLHOUSE;
        }

        if(camera.mode == "mode.floorplan"){
            mode = this.mpSdk.Mode.Mode.FLOORPLAN;
        }

        if(camera.mode == "mode.inside"){
            mode = this.mpSdk.Mode.Mode.INSIDE;
        }


        const detail = {

                position : camera.position,
                rotation : camera.rotation,
                transition : this.mpSdk.Mode.TransitionType.FLY,
                zoom
        }

        



        this.mpSdk.Mode.moveTo(mode,detail)
        .then(()=>{

            callback(true)
        })




      }



      zoomTo(level,callback){


        this.mpSdk.Camera.zoomTo(parseFloat(level))
        .then(newZoom=>{
            console.log("new Zoom done",newZoom)
        })
        .catch(e=>{
            console.log("fail",e)
        })
      }



      floorTo(floor,callback){


        if (floor > -1){
                this.mpSdk.Floor.moveTo(floor)
                .then(floorIndex=> {
                    // Move to floor complete.
                    console.log('Current floor: ' + floorIndex);
                    callback('finish index',floorIndex)
                })
                .catch(error=> {
                    // Error moving to floor.
                });

        }
        else{
                this.mpSdk.Floor.showAll()
                .then(()=>{
                  // Show floors complete.

                  callback('finish index all')
                })
                .catch(e=> {
                  // Error displaying all floors.
                });


        }

      }


}