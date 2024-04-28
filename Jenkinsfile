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
                git 'https://github.com/iprime2/visitor-management'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pnpm install'
            }
        }

        stage('Build') {
            steps {
                sh 'pnpm run build'
            }
        }

        stage('Start Next.js App') {
            steps {
                sh 'pnpm start'
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
