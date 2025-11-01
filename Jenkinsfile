pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building project...'
            }
            post {
                success {
                    echo 'Archiving build artifacts'
                    archiveArtifacts artifacts: '**/*.html'
                    emailext(
                        body: 'Congratulations! Your build succeeded.',
                        subject: 'Build Success',
                        to: 'ruthran.arul1803@gmail.com'
                    )
                }
                failure {
                    emailext(
                        body: 'Sorry, your build failed.',
                        subject: 'Build Failed',
                        to: 'ruthran.arul1803@gmail.com'
                    )
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment successful!'
            }
        }
    }
}
