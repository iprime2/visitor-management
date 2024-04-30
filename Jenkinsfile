pipeline {
    agent none

    stages {
        stage('Checkout') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                }
            }
            steps {
                git branch: 'main', url: 'https://github.com/iprime2/visitor-management'
            }
        }

        stage('Build with Node 22') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                }
            }
            steps {
                sh 'npm i -g pnpm'
                sh 'pnpm install --frozen-lockfile'
                sh 'pnpm run build'
            }
        }

        stage('Build with Node 18') {
            agent {
                docker {
                    image 'node:18-bullseye'
                    args '-u root'
                }
            }
            steps {
                sh 'npm i -g pnpm'
                sh 'pnpm install --frozen-lockfile'
                sh 'pnpm run build'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
