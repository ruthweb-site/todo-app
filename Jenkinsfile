pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building project...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment successful!'
            }
        }
    }

    post {
        success {
            echo 'Archiving build artifacts'
            archiveArtifacts artifacts: '**/*.html'
            emailext(
                attachLog: true,
                body: 'Congratulations! Your build was successful.',
                subject: 'Build Success',
                to: 'ruthran.arul1803@gmail.com'
            )
        }
        failure {
            emailext(
                attachLog: true,
                body: 'Sorry, your build failed.',
                subject: 'Build Failed',
                to: 'ruthran.arul1803@gmail.com'
            )
        }
    }
}
