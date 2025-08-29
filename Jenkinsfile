pipeline {
  agent any

  tools {
    nodejs 'node 18'
  }

  environment {
    VM_USER = 'ubuntu'
    VM_HOST = '35.172.191.199'
    APP_DIR = '/home/ubuntu/next-app'
    NODE_VERSION = '20.19.4'
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
      steps {
        sshagent (credentials: ['deploy-key']) {
          sh '''
            echo "🔧 Connecting to VM and installing system dependencies..."
            ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST <<'ENDSSH'
set -e

# Update packages
sudo apt-get update -y
sudo apt-get install -y curl rsync build-essential

# Install NVM if not present
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

# Install Node.js and PM2
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION
nvm use $NODE_VERSION

npm install -g pm2

# Create app directory
mkdir -p $APP_DIR
ENDSSH

            echo "📦 Copying project files to VM using rsync..."
            rsync -avz --exclude=node_modules --exclude=.next -e "ssh -o StrictHostKeyChecking=no" . $VM_USER@$VM_HOST:$APP_DIR

            echo "🚀 Running app setup and starting with PM2 on VM..."
            ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST <<'ENDSSH'
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use $NODE_VERSION

cd $APP_DIR

npm install

if pm2 describe next-app > /dev/null 2>&1; then
  pm2 restart next-app
else
  pm2 start npm --name "next-app" -- run start
fi

pm2 save
ENDSSH
          '''
        }
      }
    }
  }
}
