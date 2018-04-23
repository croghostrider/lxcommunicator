'use strict';

(function() {

    function FeatureCheck() { }

    FeatureCheck.feature = {
        TOKEN_CFG_VERSION: "8.4.5.10",
        ENCRYPTION_CFG_VERSION: "8.1.10.14",
        TOKENS: "9.0.7.25",
        ENCRYPTED_SOCKET_CONNECTION: "7.4.4.1",
        ENCRYPTED_CONNECTION_FULLY: "8.1.10.14"
    };

    FeatureCheck.setCurrentVersion = function setCurrentVersion(current) {
        this._currentVersion = current;
    };

    FeatureCheck.hasCurrentVersion = function hasCurrentVersion() {
        return !!this._currentVersion;
    };

    FeatureCheck.check = function check(required, current) {
        if (!current && !this._currentVersion) {
            console.error("No current version has been provided! Either use setCurrentVersion or add the current version as second parameter!");
            return false;
        }

        var requiredV = _partify(required),
            currV = _partify(current || this._currentVersion),
            isOkay = true;

        for (var i = 0; i < requiredV.length && i < currV.length && isOkay; i++) {
            if (requiredV[i] < currV[i]) {
                // if the one of the first parts is smaller, the rest no longer needs to be checked.
                isOkay = true;
                break;
            } else {
                isOkay = requiredV[i] <= currV[i];
            }
        }
        return isOkay;
    };

    var _partify = function _partify(versionString) {
        if (!versionString) {
            debugger;
        }
        var prts = [];
        versionString.split(".").forEach(function (prt) {
            prts.push(parseInt(prt));
        });
        return prts;
    };

    //////////////////////////////////////////////////////////////////////
    module.exports = FeatureCheck;
    //////////////////////////////////////////////////////////////////////

}).call(this);
