
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Application 2 source code'
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                echo 'Application 2 repository cloned successfully'

                sh 'pwd'
                sh 'ls -la'
            }
        }
    }
}
