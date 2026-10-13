
pipeline {

    agent any

    options {
        timestamps()
    }

    environment {
        DOCKERHUB_USERNAME = 'nikhilrao6225'

        BACKEND_IMAGE  = 'nikhilrao6225/app2-backend'
        FRONTEND_IMAGE = 'nikhilrao6225/app2-frontend'

        IMAGE_TAG = 'v1'
    }

    stages {

        // STAGE 1: CHECKOUT
        stage('Checkout') {
            steps {
                echo 'Checking out Application 2 source code'
                checkout scm
            }
        }

        // STAGE 2: BACKEND BUILD AND TEST
        stage('Backend Build and Test') {
            steps {
                dir('backend') {
                    sh '''
                        set -e

                        echo "Checking Java version"
                        java -version

                        echo "Building Spring Boot backend"

                        if [ -f "./mvnw" ]; then
                            chmod +x ./mvnw
                            ./mvnw clean verify
                        else
                            mvn clean verify
                        fi
                    '''
                }
            }
        }

        // STAGE 3: FRONTEND BUILD
        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh '''
                        set -e

                        echo "Checking Node.js version"
                        node --version

                        echo "Checking npm version"
                        npm --version

                        echo "Installing frontend dependencies"
                        npm ci

                        echo "Building React frontend"
                        npm run build
                    '''
                }
            }
        }

    }

    post {
        success {
            echo 'Application 2 build and tests completed successfully!'
        }

        failure {
            echo 'Application 2 pipeline failed. Check Console Output.'
        }

        always {
            echo 'Application 2 pipeline execution finished.'
        }
    }
}
