// const functions = require('firebase-functions');
var express = require('express'),
bodyParser  = require("body-parser"),
    app = express();
    const checksum_lib = require( './paytm/checksum/checksum')

    const port = 3000
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/payment',(req,res)=>{
        let params ={}
        params['MID'] = 'DqUEHM48435038264982',
        params['WEBSITE'] = 'WEBSTAGING',
        params['CHANNEL_ID'] = 'WEB',
        params['INDUSTRY_TYPE_ID'] = 'Retail',
        params['ORDER_ID'] = 'ORD0001',
        params['CUST_ID'] = 'CUST0011',
        params['TXN_AMOUNT'] = '100',
        params['CALLBACK_URL'] = 'http://localhost:3000/',
        params['EMAIL'] = 'sathwiq301198@gmail.com',
        params['MOBILE_NO'] = '9492232468'

        checksum_lib.genchecksum(params,'BpsCtQdgvFQnOFy!',function(err,checksum){
            console.log(err)
            let txn_url = "https://securegw-stage.paytm.in/order/process"

            let form_fields = ""
            for(x in params)
            {
                form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"

            }

            form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />"

            var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="https://securegw-stage.paytm.in/order/process" name="f1">'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.write(html)
            res.end()
        })
    })
app.post('/', (req, res)=> {
    console.log(req.body)
        res.send('hi')
    });
    app.listen(3000,()=>{
        console.log("Listening on port 5000")
    })

// exports.app = functions.https.onRequest(app);