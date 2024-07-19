# <div align="center">‼️ This repository is deprecated and no longer used ‼️</div>

---

# Klaytn Faucet

KLAY have no market value, they can be obtained for free and are meant for testing purposes only.

Klaytn network faucets provide KLAY to legitimate developers willing to deploy and test contracts on the Klaytn network. The faucets also prevent malicious actors from obtaining large amounts of KLAY.

### Prerequisites

In order to compile and run everything you will need:

- Node installed (^[v16.16.0](https://nodejs.org/en/blog/release/v16.16.0/) recommended)
- [HCaptcha SITE_KEY](https://dashboard.hcaptcha.com/sites?page=1)


## Install and Setup

Install the app with yarn (recommended) or npm:

### `yarn install`
or
### `npm install`

Then copy file env.production.example and rename it to .env:

### Update `API_BASE_URL` and `HCAPTCHA_SITE_KEY`

Update API_BASE_URL with your Api url and HCAPTCHA_SITE_KEY with your Hcaptcha site key.

### Setup Hcaptcha

Add your domain to the allowed domains list on the Hcaptcha dashboard.

Hcaptcha only works with public addresses, so you need to make your IP address public or use support tools.


## Start with localhost

Runs the app in the development mode.

### `npm start`

The application will run by default on port 3000. If you want to run the application on another port, please change the PORT in the .env file.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To use HCaptcha you need to make your IP address public or use a tool that tunnels between your localhost and the internet.

- Eg: [ngrok](https://ngrok.com).


## Build into production

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
