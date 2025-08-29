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

    stage('Install Dependencies & Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Provision & Deploy VM') {
      steps {
        sshagent (credentials: ['deploy-key']) {
          
          // Provision and install dependencies with Node + PM2
          sh '''
echo "🔧 Provisioning VM and setting up Node environment..."
ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST <<'ENDSSH'
set -e

# Update and install required packages
sudo apt-get update -y
sudo apt-get install -y curl rsync build-essential

# Install NVM if missing
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load nvm into this shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install, alias, and use Node
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION
nvm use $NODE_VERSION

# Install PM2 globally
npm install -g pm2

# Prepare app directory
mkdir -p $APP_DIR
ENDSSH

echo "📦 Syncing project files to VM..."
rsync -avz --exclude=node_modules --exclude=.next -e "ssh -o StrictHostKeyChecking=no" ./ $VM_USER@$VM_HOST:$APP_DIR

echo "🚀 Deploying application and starting via PM2..."
ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST <<'ENDSSH'
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Ensure correct Node version
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
