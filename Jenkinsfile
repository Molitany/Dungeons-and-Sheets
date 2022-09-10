pipeline {
  agent {
    docker {
      image 'dungeons-and-sheets-blueocean:2.361.1-1'
    }

  }
  stages {
    stage('Init') {
      steps {
        git(url: 'https://github.com/Molitany/Dungeons-and-Sheets.git', branch: 'master')
      }
    }

    stage('Frontend') {
      parallel {
        stage('Frontend') {
          steps {
            sh 'install node'
          }
        }

        stage('Backend') {
          steps {
            sh 'curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin -channel 6.0'
          }
        }

      }
    }

  }
}