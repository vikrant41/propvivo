pipeline {
  agent any

  tools {
        nodejs 'node 18'   // must match the name you set in Jenkins
    }

  environment {
    VM_USER = 'ubuntu'
    VM_HOST = '135.18.142.255'
    APP_DIR = '/home/ubuntu/next-app'
  }

  stages {
    stage('Clone Repo') {
      steps {
         git branch: 'main', url: 'https://github.com/vikrant41/propvivo.git'
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

    stage('Deploy to VM') {
      steps {
        sshagent (credentials: ['deploy-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST 'mkdir -p $APP_DIR'
            scp -r * $VM_USER@$VM_HOST:$APP_DIR
            ssh $VM_USER@$VM_HOST 'cd $APP_DIR && npm install && pm2 restart next-app || pm2 start npm --name "next-app" -- run start'
          """
        }
      }
    }
  }
}
