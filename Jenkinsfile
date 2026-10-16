
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        BACKEND_IMAGE  = 'nikhilrao6225/app2-backend'
        FRONTEND_IMAGE = 'nikhilrao6225/app2-frontend'
        IMAGE_TAG = 'v1'
    }

    stages {

        // 1. Checkout source code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
                echo 'GitHub checkout successful'
            }
        }

        // 2. Detect actual project directories
        stage('Detect Project Structure') {
            steps {
                script {
                    env.BACKEND_DIR = sh(
                        script: "find . -name pom.xml -not -path '*/target/*' -print -quit | xargs -r dirname",
                        returnStdout: true
                    ).trim()

                    env.FRONTEND_DIR = sh(
                        script: "find . -name package.json -not -path '*/node_modules/*' -print -quit | xargs -r dirname",
                        returnStdout: true
                    ).trim()

                    if (!env.BACKEND_DIR || !env.FRONTEND_DIR) {
                        error 'Could not find pom.xml or package.json'
                    }

                    echo "Backend: ${env.BACKEND_DIR}"
                    echo "Frontend: ${env.FRONTEND_DIR}"
                }
            }
        }

        // 3. Check installed tools
        stage('Check Tools') {
            steps {
                sh '''
                    set -e
                    java -version
                    mvn -version
                    node --version
                    npm --version
                    docker --version
                '''
            }
        }

        // 4. Build and test Spring Boot backend
        stage('Backend Build and Test') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh '''
                        set -e
                        mvn clean verify
                    '''
                }
            }
        }

        // 5. Build React frontend
        stage('Frontend Build and Test') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh '''
                        set -e

                        if [ -f package-lock.json ]; then
                            npm ci
                        else
                            npm install
                        fi

                        npm run build
                    '''
                }
            }
        }

        // 6. Verify Docker daemon connectivity
        stage('Docker Connectivity') {
            steps {
                sh '''
                    set -e

                    echo "Checking Docker daemon..."
                    docker info

                    echo "Docker connection successful!"
                '''
            }
        }
    }

    post {
        success {
            echo 'Application 2 build and Docker connectivity checks completed!'
        }

        failure {
            echo 'Pipeline failed. Check Console Output for the error.'
        }

        always {
            echo 'Application 2 pipeline execution finished.'
        }
    }
}
