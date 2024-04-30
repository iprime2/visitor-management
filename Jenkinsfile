pipeline {
     agent {
         docker {
             image 'node:22-alpine'
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

         stage('Install pnpm') {
             steps {
                 sh 'npm install -g pnpm'
             }
         }

         stage('Build') {
             steps {
                 sh 'npm run build'
             }
         }
         
     }

    post {
         always {
             cleanWs()
        }
  }
}
