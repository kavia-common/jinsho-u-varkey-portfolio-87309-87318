#!/bin/bash
cd /home/kavia/workspace/code-generation/jinsho-u-varkey-portfolio-87309-87318/frontend_portfolio
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

