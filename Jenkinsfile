// pipeline {
//     agent {
//         docker {
//             image 'node:22-alpine'
//             args '-u root'
//         }
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/iprime2/visitor-management'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Install pnpm') {
//             steps {
//                 sh 'npm i -g pnpm'
//             }
//         }

//         stage('Build') {
//             steps {
//                 sh 'npm run build'
//             }
//         }

//         // stage('Start Next.js App') {
//         //     steps {
//         //         sh 'npm start'
//         //     }
//         // }

//         // stage('Check App Status') {
//         //     steps {
//         //         sh 'curl http://localhost:3000'
//         //         sh 'echo "Next.js app is running"'
//         //     }
//         // }
//     }

//     post {
//         always {
//             cleanWs()
//         }
//     }
// }

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
                sh 'pnpm install'
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
                sh 'pnpm install'
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
