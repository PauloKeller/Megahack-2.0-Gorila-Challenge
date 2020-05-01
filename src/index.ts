import { Twilio } from 'twilio'
import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express()
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


app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${port}` );
});

