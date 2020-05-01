import { Twilio } from 'twilio'
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

dotenv.config();

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

const port = 5000;
const twilio: Twilio = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_TOKEN
)
const options = {
  from: `whatsapp:+${process.env.TWILIO_NUMBER_FROM}`,
  to: `whatsapp:+${process.env.TWILIO_NUMBER_TO}`,
  body: 'A equipe 7 é a melhor equipe de naruto',
}


app.get("/", async (req, res) => {
  // tslint:disable-next-line:no-console
  await twilio.messages.create(options).then(message => console.log(message.sid))
})

app.post("/webhook", (req, res) => {
  const msg = req.body.Body
  const messaginResponse = new MessagingResponse()
  messaginResponse.message(`Message ${msg}`)
  res.send(messaginResponse.toString())
})


app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${port}` );
});

