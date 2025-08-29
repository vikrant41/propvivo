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
            # Connect to the VM, install dependencies, and setup Node.js/PM2
            ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_HOST} "bash -s" <<'ENDSSH'
              set -e

              echo "🔧 Connecting to VM and installing system dependencies..."
              sudo apt-get update -y
              sudo apt-get install -y curl rsync build-essential

              # Install NVM if not present
              export NVM_DIR="\$HOME/.nvm"
              if [ ! -d "\$NVM_DIR" ]; then
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
              fi

              export NVM_DIR="\$HOME/.nvm"
              [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
              [ -s "\$NVM_DIR/bash_completion" ] && . "\$NVM_DIR/bash_completion"

              # Install Node.js
              nvm install ${NODE_VERSION}
              nvm alias default ${NODE_VERSION}
              nvm use ${NODE_VERSION}

              # Install PM2 globally
              npm install -g pm2

              # Ensure app directory exists
              mkdir -p ${APP_DIR}
ENDSSH
            
            echo "📦 Copying project files to VM using rsync..."
            rsync -avz --exclude=node_modules --exclude=.next -e "ssh -o StrictHostKeyChecking=no" . ${VM_USER}@${VM_HOST}:${APP_DIR}

            # Connect to the VM and run the application
            ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_HOST} "bash -s" <<'ENDSSH'
              set -e

              echo "🚀 Running app setup and starting with PM2 on VM..."
              export NVM_DIR="\$HOME/.nvm"
              [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"

              nvm use ${NODE_VERSION}

              cd ${APP_DIR}

              npm install

              if pm2 describe next-app > /dev/null 2>&1; then
                pm2 restart next-app
              else
                pm2 start npm --name "next-app" -- run start
              fi

              pm2 save
ENDSSH
          """
        }
      }
    }
  }
}