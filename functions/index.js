const functions = require('firebase-functions');
var express = require('express'),
bodyParser  = require("body-parser"),
    app = express();
    app.use((req,res,next)=>{
      res.setHeader("Access-Control-Allow-origin","*"); 
      res.setHeader("Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept, Authorization");
      res.setHeader('Access-Control-Allow-Methods',
      "GET,POST,PATCH,DELETE,PUT,OPTIONS");     
      next(); 
    });
    const firebaseConfig = {
        apiKey: "AIzaSyBRjyQl1jUy91eDut-wPVeaX1E-6TuEB0M",
        authDomain: "homemade-45afb.firebaseapp.com",
        databaseURL: "https://homemade-45afb.firebaseio.com",
        projectId: "homemade-45afb",
        storageBucket: "homemade-45afb.appspot.com",
        messagingSenderId: "419797128768",
        appId: "1:419797128768:web:17028862583dcc8316b1a5",
        measurementId: "G-RX7BN2CV8L"
      };
    var firebase = require("firebase");
    firebase.initializeApp(firebaseConfig);
    var db =firebase.firestore();
    const checksum_lib = require( './paytm/checksum/checksum')

    const port = 3000
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/payment/:id',(req,res)=>{ 
        db.collection('orders').doc(req.params.id)
            .get().then(i =>{
                const data = i.data()
                console.log(data)
                let params ={}
                params['MID'] = 'DqUEHM48435038264982',
                params['WEBSITE'] = 'WEBSTAGING',
                params['CHANNEL_ID'] = 'WEB',
                params['INDUSTRY_TYPE_ID'] = 'Retail',
                params['ORDER_ID'] = req.params.id,
                params['CUST_ID'] = ''+data.uid ,
                params['TXN_AMOUNT'] = ''+data.paid,
                // params['CALLBACK_URL'] = 'http://localhost:5000/homemade-45afb/us-central1/app',
                params['CALLBACK_URL'] = 'https://us-central1-homemade-45afb.cloudfunctions.net/app',
                params['EMAIL'] = 'sathwiq301198@gmail.com',
                params['MOBILE_NO'] = '9492232468'

                checksum_lib.genchecksum(params,'BpsCtQdgvFQnOFy!',function(err,checksum){
                    console.log(err+'checksum')
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
                return 1
            })
            .catch(err=> console.log(err))

        
    })

app.post('/', (req, res)=> {
  console.log(req.body)
    db.collection('orders').doc(req.body.ORDERID).update({
        transactionStatus : req.body.STATUS,
        transactionId : req.body.TXNID ,
        statusCode : req.body.RESPCODE
    })
    .then(()=> {console.log('success')
    var html = '<html><body><center><h1>Success</h1></center> </body></html>'
                    res.writeHead(200,{'Content-Type' : 'text/html'})
                    res.write(html)
                    return 1
  })
    .catch((err)=> console.log(err))
    
    return 1
});  


const admin = require('firebase-admin');
var serviceAccount = require("./service.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://homemade-45afb.firebaseio.com"
});
app.post('/setCustomClaims/', (req, res) => {
  console.log(req.body.uid)
  admin.auth().setCustomUserClaims(req.body.uid, {chef: true})
    .then(()=> {
      res.status(201).json({
        message:"Success"
      });
      return 1
    } )
    .catch(()=>{
      res.status(400).json({
        message:"error"
      });
    }
    )
  return 1

  });

exports.app = functions.https.onRequest(app);

