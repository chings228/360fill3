



export default class SyncGuest{


    

    constructor(mp,pv){


     

        this.mp = mp
        this.pv = pv

        this.isMoveDone = true

        this.lastCamera = {}

        this.init()


    }


    init(){

        this.pv.on('incomingdata',e=>{

            console.log(e.key)


            if (e.key == 'zoom'){

                console.log("zoom",e.content)


                this.mp.zoomTo(e.content.level,e=>{
                    console.log("done")
                })



            }
            else if (e.key == 'floor'){


                console.log("floor",e.content)


                const floorinfo = e.content

           

                this.mp.floorTo(e.content.sequence,e=>{


                    console.log(e)

                })


      







            }




         

            else if (e.key == 'camera'){


                console.log(e.content)

                if (e.content.mode == "mode.transitioning") return;

                if (!this.lastCamera.hasOwnProperty("mode")){

                    this.lastCamera = e.content

                    console.log(this.lastCamera)
                    return
                }


             
                console.log("mode match ",this.lastCamera.mode,e.content.mode)
                const camera = e.content

                 if (this.lastCamera.mode == e.content.mode ){

                   

                    if (e.content.mode == "mode.inside" ){

                        console.log("inside")

                        if (this.isMoveDone){
    
                            this.isMoveDone = false
        
                           
        
                            console.log("move ......")
                            this.mp.moveTo(camera,e=>{
        
                                this.isMoveDone = true
        
                                //console.log("move finish",e)
        
        
                            })
        
                        }
    
                    }
                    else{

                        console.log("no inside")

                        if (this.isMoveDone){

                            console.log("rotate dollhouse")

                            this.isMoveDone = false

                            this.mp.modeTo(camera,1,e=>{


                                this.isMoveDone = true

                                console.log(e)
                            })


                        }


                    }


                 }

                 else{


                    let mode = "";
                    let zoom = "";


      
                    if (this.isMoveDone){


                        this.isMoveDone = false

                        this.mp.modeTo(camera,1,e=>{

                            this.isMoveDone = true

                            console.log(e)

                        })

                    }





                 }




                this.lastCamera = e.content



            }

        })


    }


}