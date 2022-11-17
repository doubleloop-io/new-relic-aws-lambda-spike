# new relic aws lambda

## Usage

### EventBridge

The `validate-checkout` lambda sends an event to EventBridge, that forwards it to `start-checkout` lambda.

```bash
curl -d '{"name":"john"}' <api_gateway_url>/validate-checkout
```

## Deploy

```bash
# region is us-east-1
export AWS_PROFILE=...
npm run build
npm run deploy
```
