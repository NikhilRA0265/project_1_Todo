
pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        BACKEND_IMAGE  = 'nikhilrao6225/app2-backend'
        FRONTEND_IMAGE = 'nikhilrao6225/app2-frontend'
        IMAGE_TAG = 'v1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Tools') {
            steps {
                sh '''
                    java -version
                    mvn -version
                    node --version
                    npm --version
                    docker --version
                '''
            }
        }

        stage('Backend Build and Test') {
            steps {
                dir('backend') {
                    sh '''
                        if [ -f mvnw ]; then
                            chmod +x mvnw
                            ./mvnw clean verify
                        else
                            mvn clean verify
                        fi
                    '''
                }
            }
        }

        stage('Frontend Build and Test') {
            steps {
                dir('frontend') {
                    sh '''
                        npm ci
                        npm run build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Application 2 build and tests completed!'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}
