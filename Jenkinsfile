pipeline {
  agent any

  tools {
    nodejs 'node 18' // Jenkins will use this on the Jenkins node, not on the remote VM
  }

  environment {
    VM_USER = 'ubuntu'
    VM_HOST = '135.18.142.255'
    APP_DIR = '/home/ubuntu/next-app'
    NODE_VERSION = 'v20.19.4'
    NVM_DIR = '/home/ubuntu/.nvm'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/vikrant41/propvivo.git'
      }
    }

    stage('Install Dependencies (Jenkins Node)') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build (Jenkins Node)') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy and Setup on VM') {
      steps {
        sshagent (credentials: ['deploy-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST << 'EOF'
              # Install NVM if not already installed
              if [ ! -d "$NVM_DIR" ]; then
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
              fi

              # Load NVM into current shell
              export NVM_DIR="$NVM_DIR"
              [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"

              # Install and use Node.js version
              nvm install $NODE_VERSION
              nvm use $NODE_VERSION
              nvm alias default $NODE_VERSION

              # Install pm2 globally
              npm install -g pm2

              # Create app directory
              mkdir -p $APP_DIR
            EOF

            # Copy source files to the VM
            scp -r * $VM_USER@$VM_HOST:$APP_DIR

            # Run setup commands on the remote VM
            ssh $VM_USER@$VM_HOST << 'EOF'
              export NVM_DIR="$NVM_DIR"
              [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
              nvm use $NODE_VERSION

              cd $APP_DIR

              npm install
              npm run build

              pm2 restart next-app || pm2 start npm --name "next-app" -- run start
            EOF
          """
        }
      }
    }
  }
}
