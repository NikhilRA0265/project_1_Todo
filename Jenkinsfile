
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Application 2'
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat '''
                    @echo off
                    if exist mvnw.cmd (
                        call mvnw.cmd clean verify
                    ) else (
                        call mvn clean verify
                    )
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat '''
                    @echo off
                    call npm ci
                    if errorlevel 1 exit /b %errorlevel%

                    call npm run build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Application 2 build completed successfully!'
        }

        failure {
            echo 'Application 2 build failed. Check the Console Output.'
        }
    }
}
