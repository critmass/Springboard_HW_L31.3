

const fs = require('fs')
const axios = require('axios')


function cat( path, fileName ){

    try {
        // store the read file contents
        const contents = fs.readFileSync(path, 'utf8');
        catOutput( contents, fileName )
    } 
    catch (err) {
        // errors thrown by fs will be caught here
        console.error(
            `Error reading ${ err.path }:
            Error: ${ err.code }: no such file or directory, ${ err.syscall} ${ err.path }`
            );
        // kill the process and tell the shell it errored
        process.exit(1);
    }
    
}

async function webCat( URL, fileName ){

    try{        
        const page = await axios.get(URL)
        catOutput( page.data, fileName )
    }
    catch (err) {
        console.error( 
            `Error fetching ${ err.config.url }:
        Error: Request failed with status code ${ err.response.status }` 
        )

        process.exit(1)
    }

}

function catOutput( contents, fileName ){
    if ( filename ){
        
        fs.writeFile(fileName, contents, {encoding:"utf8"}, err => {
            if( err ){

                console.error(
                    `Couldn't write ${ err.path }:
                Error: ${ err.code }: no such file or directory, ${ err.syscall } ${err.path}`
                )
    
                process.exit(1)
            }
        })
    }
    else{
        console.log(`${ contents }`);
    }
}

let target = false


const argv = process.argv;

const element = argv.pop()

if( argv.some( val => val == "--out" ) ){
    target = argv.pop()
}



if( element.includes("//") ){
    webCat( element, target )
}
else{
    cat( element, target )
}


