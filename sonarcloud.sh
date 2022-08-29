#!/bin/sh

sonar-scanner.bat \
  -D"sonar.organization=slash-foundry" \
  -D"sonar.projectKey=mapogram-webapp" \
  -D"sonar.sources=." \
  -D"sonar.host.url=https://sonarcloud.io"
  