/*
 *  Document   : setting.js
 *  Author     : Meaglith Ma <genedna@gmail.com> @genedna
 *  Description:
 *
 */

'use strict';

//Auth Page Module
angular.module('setting', ['ngRoute', 'ngMessages', 'ngCookies', 'angular-growl', 'angularFileUpload'])
    .controller('SettingProfileCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', function($scope, $cookies, $http, growl, $location, $timeout, $upload) {
        //init user info
        $http.get('/w1/profile')
            .success(function(data, status, headers, config) {
                $scope.user = data
            })
            .error(function(data, status, headers, config) {

            });

        //deal with fileupload start
        $scope.submmitting = false;
        $scope.upload = function(files) {
            $http.defaults.headers.post['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    $upload.upload({
                        url: '/w1/gravatar',
                        file: file
                    }).progress(function(evt) {
                        //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('progress: ' + progressPercentage + '% ' +
                        //   evt.config.file.name);
                    }).success(function(data, status, headers, config) {
                        growl.info(data.message);
                        $scope.user.gravatar = data.url
                    });
                }
            }
        };

        $scope.submit = function() {
            if ($scope.profileForm.$valid) {
                $http.defaults.headers.put['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
                $http.put('/w1/profile', $scope.user)
                    .success(function(data, status, headers, config) {
                        $scope.submmitting = true;
                        growl.info(data.message);
                    })
                    .error(function(data, status, headers, config) {
                        $scope.submitting = false;
                        growl.error(data.message);
                    });
            }
        }
    }])
    .controller('SettingAccountCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window) {
        $scope.submitting = false;
        $scope.submit = function() {
            if ($scope.accountForm.$valid) {
                $http.defaults.headers.put['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
                $http.put('/w1/account', $scope.user)
                    .success(function(data, status, headers, config) {
                        $scope.submitting = true;
                        growl.info(data.message);
                    })
                    .error(function(data, status, headers, config) {
                        $scope.submitting = false;
                        growl.error(data.message);
                    });
            }
        }
    }])
    .controller('SettingEmailsCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window) {
        $scope.submit = function() {
            $http.defaults.headers.put['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
        }
    }])
    .controller('SettingNotificationCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window) {
        $scope.submit = function() {

        }
    }])
    .controller('SettingOrganizationCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', '$routeParams', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window, $routeParams) {
        $http.get('/w1/organizations/' + $routeParams.org)
            .success(function(data, status, headers, config) {
                $scope.organization = data;
                /*  if length(data) == 0 {
                      $scope.organizationShow = false;
                      return
                  }
                  $scope.organizationShow = true;*/
            })
            .error(function(data, status, headers, config) {
                $timeout(function() {
                    //$window.location.href = '/auth';
                    alert(data);
                }, 3000);
            });
        $scope.submitting = false;
        $scope.submit = function() {
            if (true) {
                $http.defaults.headers.put['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
                $http.put('/w1/organization', $scope.organization)
                    .success(function(data, status, headers, config) {
                        $scope.submitting = true;
                        growl.info(data.message);
                    })
                    .error(function(data, status, headers, config) {
                        growl.error(data.message);
                    });
            }
        }
    }])
    .controller('SettingOrganizationAddCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window) {
        $scope.submitting = false;
        $scope.submit = function() {
            if (true) {
                $http.defaults.headers.post['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
                $http.post('/w1/organization', $scope.organization)
                    .success(function(data, status, headers, config) {
                        $scope.submitting = true;
                        growl.info(data.message);
                    })
                    .error(function(data, status, headers, config) {
                        $scope.submitting = false;
                        growl.error(data.message);
                    });
            }
        }

        $scope.createOrg = function() {
            $window.location.href = '/setting#/org/add';
        }
    }])
    .controller('SettingTeamCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', '$routeParams', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window, $routeParams) {
        //初始化加载user的organization信息
        $http.get('/w1/organizations')
            .success(function(data, status, headers, config) {
                $scope.team = data
            })
            .error(function(data, status, headers, config) {

            });

        $scope.submit = function() {

        }

        $scope.createTeam = function() {
            $window.location.href = '/setting#/team/add';
        }
    }])
    .controller('SettingTeamAddCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window) {
        $scope.submitting = false;
        $scope.users = [];
        $scope.team = new Object();
        $scope.team.users = [];
        //初始化organization数据
        $http.get('/w1/organizations')
            .success(function(data, status, headers, config) {
                $scope.organizations = data;

            })
            .error(function(data, status, headers, config) {
                $timeout(function() {
                    //$window.location.href = '/auth';
                    alert(data);
                }, 3000);
            });

        $scope.submit = function() {
            if (true) {
                $http.defaults.headers.post['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
                $http.post('/w1/team', $scope.team)
                    .success(function(data, status, headers, config) {
                        $scope.submitting = true;
                        growl.info(data.message);
                    })
                    .error(function(data, status, headers, config) {
                        $scope.submitting = false;
                        growl.error(data.message);
                    });
            }
        }

        var availableTags = ["chliang2030598", "fivestarsky"];

        $("#tags").autocomplete({
            source: availableTags
        });


        $scope.addUserFunc = function() {
            $scope.findUser = {}
            $scope.findUser.username = document.getElementById("tags").value;

            //adjust user already add
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].username == document.getElementById("tags").value) {
                    growl.error("user already exist!");
                    $('#myModal').modal('toggle');
                    return;
                }
            }
            $scope.users.push($scope.findUser);
            $scope.team.users.push($scope.findUser.username);
            $('#myModal').modal('toggle');
        }

    }])
    .controller('OrganizationListCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window) {
        //init organization  info
        $http.get('/w1/organizations')
            .success(function(data, status, headers, config) {
                $scope.organizaitons = data;
                /*  if length(data) == 0 {
                      $scope.organizationShow = false;
                      return
                  }
                  $scope.organizationShow = true;*/
            })
            .error(function(data, status, headers, config) {
                $timeout(function() {
                    //$window.location.href = '/auth';

                }, 3000);
            });
    }])
    .controller('SettingCompetenceCtrl', ['$scope', '$cookies', '$http', 'growl', '$location', '$timeout', '$upload', '$window', '$routeParams', function($scope, $cookies, $http, growl, $location, $timeout, $upload, $window, $routeParams) {
        //get teams data
        $scope.repositoryAdd = {};
        $scope.repo = {};
        $http.get('/w1/teams')
            .success(function(data, status, headers, config) {
                $scope.teams = data;
                /*  if length(data) == 0 {
                      $scope.organizationShow = false;
                      return
                  }
                  $scope.organizationShow = true;*/
            })
            .error(function(data, status, headers, config) {
                $timeout(function() {
                    //$window.location.href = '/auth';
                    alert(data.message);
                }, 3000);
            });
        //get repotories data
        $http.get('/w1/organizations/' + $routeParams.org + '/repo')
            .success(function(data, status, headers, config) {
                $scope.organiztionrepos = data;
                $scope.repositoryAdd = data[0];
            })
            .error(function(data, status, headers, config) {
                $timeout(function() {
                    //$window.location.href = '/auth';
                    alert(data.message);
                }, 3000);
            });

        //
        $scope.repo.privilege = "false";

        $scope.open = function(teamUUID) {
            $('#myModal').modal('toggle');
            $scope.repo.teamUUID = teamUUID;
        }

        $scope.addRepo4Team = function() {
            $scope.repo.repoUUID = $scope.repositoryAdd.UUID;
            $http.defaults.headers.post['X-XSRFToken'] = base64_decode($cookies._xsrf.split('|')[0]);
            $http.post('/w1/team/privilege', $scope.repo)
                .success(function(data, status, headers, config) {
                    $('#myModal').modal('toggle');
                    growl.info(data.message);
                })
                .error(function(data, status, headers, config) {
                    $('#myModal').modal('toggle');
                    growl.error(data.message);
                });
        }
    }])
    //routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/static/views/setting/profile.html',
                controller: 'SettingProfileCtrl'
            })
            .when('/profile', {
                templateUrl: '/static/views/setting/profile.html',
                controller: 'SettingProfileCtrl'
            })
            .when('/account', {
                templateUrl: '/static/views/setting/account.html',
                controller: 'SettingAccountCtrl'
            })
            .when('/emails', {
                templateUrl: '/static/views/setting/emails.html',
                controller: 'SettingEmailsCtrl'
            })
            .when('/notification', {
                templateUrl: '/static/views/setting/notification.html',
                controller: 'SettingNotificationCtrl'
            })
            .when('/org/add', {
                templateUrl: '/static/views/setting/organizationadd.html',
                controller: 'SettingOrganizationAddCtrl'
            })
            .when('/org/:org', {
                templateUrl: '/static/views/setting/organization.html',
                controller: 'SettingOrganizationCtrl'
            })
            .when('/team/add', {
                templateUrl: '/static/views/setting/teamadd.html',
                controller: 'SettingTeamAddCtrl'
            })
            .when('/:org/team', {
                templateUrl: '/static/views/setting/team.html',
                controller: 'SettingTeamCtrl'
            })
            .when('/:org/competence', {
                templateUrl: '/static/views/setting/competence.html',
                controller: 'SettingCompetenceCtrl'
            });
    })
    .directive('emailValidator', [function() {
        var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.emails = function(value) {
                    return EMAIL_REGEXP.test(value);
                }
            }
        };
    }])
    .directive('urlValidator', [function() {
        var URL_REGEXP = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.urls = function(value) {
                    return URL_REGEXP.test(value) || value == "";
                }
            }
        };
    }])
    .directive('mobileValidator', [function() {
        var MOBILE_REGEXP = /^[0-9]{1,20}$/;

        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.mobiles = function(value) {
                    return MOBILE_REGEXP.test(value) || value == "";
                }
            }
        };
    }])
    .directive('passwdValidator', [function() {
        var NUMBER_REGEXP = /\d/;
        var LETTER_REGEXP = /[A-z]/;

        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.passwd = function(value) {
                    return NUMBER_REGEXP.test(value) && LETTER_REGEXP.test(value);
                }
            }
        };
    }])
    .directive('confirmValidator', [function() {
        return {
            require: 'ngModel',
            restrict: '',
            scope: {
                passwd: "=confirmData"
            },
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.repeat = function(value) {
                    return value == scope.passwd;
                };
                scope.$watch('passwd', function() {
                    ngModel.$validate();
                });
            }
        };
    }])
    .directive('namespaceValidator', [function() {
        var USERNAME_REGEXP = /^([a-z0-9_]{6,30})$/;

        return {
            require: 'ngModel',
            restrict: '',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.usernames = function(value) {
                    return USERNAME_REGEXP.test(value) || value == "";
                }
            }
        };
    }]);