pipeline {
  agent any

  tools {
    nodejs 'node_20'
  }

  environment {
    VM_USER = 'ubuntu'
    VM_HOST = '35.172.191.199'
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

    stage('Provision & Deploy VM') {
      environment {
        NODE_VERSION = '20.19.4'
      }
      steps {
        sshagent (credentials: ['deploy-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_HOST} "bash -s" <<'ENDSSH'
              set -e
              sudo apt-get update -y
              sudo apt-get install -y curl rsync build-essential

              export NVM_DIR="\$HOME/.nvm"
              if [ ! -d "\$NVM_DIR" ]; then
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
              fi

              [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
              nvm install ${NODE_VERSION}
              nvm alias default ${NODE_VERSION}
              nvm use ${NODE_VERSION}
              npm install -g pm2
              mkdir -p ${APP_DIR}
            ENDSSH

            echo "📦 Rsync project files..."
            rsync -avz --exclude=node_modules --exclude='.git' --exclude='.env*' --exclude='.next' -e "ssh -o StrictHostKeyChecking=no" . ${VM_USER}@${VM_HOST}:${APP_DIR}

            ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_HOST} "bash -s" <<'ENDSSH'
              set -e
              export NVM_DIR="\$HOME/.nvm"
              [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
              nvm use ${NODE_VERSION}

              cd ${APP_DIR}
              npm install
              npm run build

              if pm2 describe next-app > /dev/null 2>&1; then
                pm2 restart next-app
              else
                PORT=3000 HOST=0.0.0.0 pm2 start npm --name "next-app" -- run start
              fi

              pm2 save
            ENDSSH
          """
        }
      }
    }
  }
}
