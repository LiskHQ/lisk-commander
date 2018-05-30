def get_build_info() {
	pr_branch = ''
	if (env.CHANGE_BRANCH != null) {
		pr_branch = " (${env.CHANGE_BRANCH})"
	}
	build_info = "#${env.BUILD_NUMBER} of <${env.BUILD_URL}|${env.JOB_NAME}>${pr_branch}"
	return build_info
}

def slack_send(color, message) {
	/* Slack channel names are limited to 21 characters */
	CHANNEL_MAX_LEN = 21

	channel = "${env.JOB_NAME}".tokenize('/')[0]
	channel = channel.replace('lisk-', 'lisk-ci-')
	if ( channel.size() > CHANNEL_MAX_LEN ) {
		 channel = channel.substring(0, CHANNEL_MAX_LEN)
	}

	echo "[slack_send] channel: ${channel} "
	slackSend color: "${color}", message: "${message}", channel: "${channel}"
}

pipeline {
	agent { node { label 'lisky' } }
	stages {
		stage('Install dependencies') {
			steps {
				sh 'npm install --verbose'
			}
		}
		stage('Build') {
			steps {
				sh 'npm run build' // Running build first, since "bin" requires reference to the "dist" folder
			}
		}
		stage('Run lint') {
			steps {
				ansiColor('xterm') {
					sh 'npm run lint'
				}
			}
		}
		stage('Run tests') {
			steps {
				ansiColor('xterm') {
					sh 'LISKY_CONFIG_DIR=$WORKSPACE/.lisky npm run test'
					sh '''
					cp ~/.coveralls.yml-lisky .coveralls.yml
					npm run cover
					'''
				}
			}
		}
	}
	post {
		success {
			script {
				build_info = get_build_info()
				slack_send('good', "Recovery: build ${build_info} was successful.")
			}
			githubNotify context: 'continuous-integration/jenkins/lisky', description: 'The build passed.', status: 'SUCCESS'
			dir('node_modules') {
				deleteDir()
			}
		}
		failure {
			script {
				build_info = get_build_info()
				slack_send('danger', "Build ${build_info} failed (<${env.BUILD_URL}/console|console>, <${env.BUILD_URL}/changes|changes>)\n")
			}
			githubNotify context: 'continuous-integration/jenkins/lisky', description: 'The build failed.', status: 'FAILURE'
		}
		aborted {
			githubNotify context: 'continuous-integration/jenkins/lisky', description: 'The build was aborted.', status: 'ERROR'
		}
		always {
			sh 'rm -f $WORKSPACE/.lisky/config.lock'
		}
	}
}
