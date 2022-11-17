#!/usr/bin/env bash
npm run lint || exit 1
npm run typecheck || exit 1
serverless package --stage=dev
