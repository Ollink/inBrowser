import * as open from 'opn';
import * as express from 'express';
import * as fs   from 'fs'; 
import * as path from 'path';

import * as getPort from 'get-port';

getPort()
    .then(start)


 
function start( availablePort : number ) {

    
    
    /* scan directory directory if no argument is given and open the first one found */
    const file      = process.argv[2] ;

    if( !file ) {

        fs.readdir(process.cwd(), function(err, items) {
            if( err ) {
                console.log('Something went wrong : \n ' + err.message );
                return;
            }

            const jsonFiles =   
                items.filter( item => item && item.substring( item.lastIndexOf('.') + 1 ).toLowerCase().indexOf('json') > -1);
            
            if( jsonFiles.length === 0 ) {
                console.log( `Didn't find any json files, please specify the file you want to open  e.g. "in-browser myJson.json".` );
                process.exit();
                return;
            }

            else if( jsonFiles.length === 1 ) {
                console.log( `Found one json file : "${jsonFiles[0]}".\n Opening in browser......`)
            }
            else if( jsonFiles.length > 1 ) {
                console.log( `Found ${jsonFiles.length} json files , opening first one found  : "${jsonFiles[0]}".\nIf you want to open a different one, please specify the file name, e.g. "in-browser myJson.json".`);
                
            }
            loadIntoBrowser( availablePort , path.join( process.cwd() , jsonFiles[0] ) );
        });
    }else {
        loadIntoBrowser( availablePort , path.join( process.cwd() , file) );
    }
    
}

function loadIntoBrowser( availablePort : number, file : string ) {

    const port      = process.env.PORT ||  availablePort;
    const app       = express();

    app.get( '/data',function( req : express.Request, res : express.Response ) {    
        fs.readFile( file , function( err, data ) {
            if( err ) res.send( err.message );
            else res.send( data.toString() );
        });
    }); 
    app.get( '/index' , function( req : express.Request ,res : express.Response  ) {
        res.sendFile( path.join( __dirname ,'index.html' ) );
    } );
    app.post( '/done' , function( req : express.Request, res : express.Response ) {
        res.send( 'done' );
        process.exit();
    } );
    app.listen( port );
    open( `http://localhost:${port}/index` );
}
 


 