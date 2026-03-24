#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-blog-platform-336293-336306/frontend_react_blog
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

