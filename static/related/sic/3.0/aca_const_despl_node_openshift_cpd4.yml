version: 2.0.0
info:
  version: 0.1.1
  description: microservice-landing
global-env:
  - CONTAINER_DOCKERFILE_PATH: Dockerfile
  - CONTAINER_IMAGE_NAME: microservice-landing
  - DEPLOYMENT_TYPE: DeploymentConfig
components:
  - build:
      steps:
        - container:
            image:
              remote:
                name: docker-registry.ctti.extranet.gencat.cat/gencat-sic-builders/node-builder:1.0-8
            resources:
              limits:
                cpu: 1000m
                memory: 1024Mi
              requests:
                cpu: 100m
                memory: 128Mi
          execution:
            commands:
              - cd micro && npm install && npm run build
    deployment:
      scm: https://git.intranet.gencat.cat/sic-tests/9990/orchestrators.git
      environments:
        - name: preproduction
          actions:
            deploy:
              steps:
                - execution:
                    env:
                      - DESCRIPTORS_PATH: microservice-landing/pre
                      - DEPLOYMENT_NAME: landing
                      - DEPLOYMENT_WAIT: 900
        - name: production
          actions:
            deploy:
              steps:
                - execution:
                    env:
                      - DESCRIPTORS_PATH: microservice-landing/pro
                      - DEPLOYMENT_NAME: landing
                      - DEPLOYMENT_WAIT: 900
notifications:
  email:
    recipients:
      - noreplay@gencat.cat
