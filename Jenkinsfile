pipeline {
    agent {
        docker {
            image 'node:16-bullseye'
            args '-u root'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/iprime2/visitor-management'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Start Next.js App') {
            steps {
                sh 'npm start'
            }
        }

        stage('Check App Status') {
            steps {
                sh 'curl http://localhost:3000'
                sh 'echo "Next.js app is running"'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
