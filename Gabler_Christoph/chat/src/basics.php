<?php

function getStylesheet(): string{
    $theme = null;
    if(array_key_exists("theme", $_GET) && $_GET["theme"] != null && strlen($_GET["theme"]) > 0){
        $theme = $_GET["theme"];
        setcookie("theme", $theme);
    }else{
        //try to get the theme cookie
        if(array_key_exists("theme", $_COOKIE) && $_COOKIE["theme"] != null && strlen($_COOKIE["theme"]) > 0){
            $theme = $_COOKIE["theme"];
        }
    }
    //return the respective stylesheets
    if($theme != null && strcmp($theme, "light") == 0){
        //dark theme here
        return '<link rel="stylesheet" type="text/css" href="./src/themes/bs-light.css"/>';
    }else{
        //light theme here
        return '<link rel="stylesheet" type="text/css" href="./src/themes/bs-dark.css"/>';
    }
}

/*
function getLanguage(): string{
    //try getting a preferred language from the url
    $lang = null;
    if(array_key_exists("language", $_GET) && $_GET["language"] != null && strlen($_GET["language"]) >= 2){
        $lang = $_GET["language"];
        setcookie("language", $lang);
    }else{
        //try getting the current language cookie
        if(array_key_exists("language", $_COOKIE) && $_COOKIE["language"] !== null && strlen($_COOKIE["language"]) >= 2){
            $lang = $_COOKIE["language"];
        }else{
            //set the cookie by getting the browsers preferred language
            $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
            setcookie("language", $lang);
        }
    }
    return $lang;
}

function getHTML(string $filePath): ?string{
    //get the language code
    $language = getLanguage();
    //load html
    $html = file_get_contents($filePath);
    //return nothing if the file could not be loaded
    if(!$html){
        return null;
    }

    //get all required language files from the document
    $matches = null;
    if(preg_match_all("/data-lang-file=\"(.+?)\"/", $html, $matches) == 0){
        return $html;
    }

    //apply every language asset
    foreach ($matches[1] as $match){
        $asset = getAsset($language, $match);
        if($asset !== null && sizeof($asset) == 2){
            //try to load the language file
            $rawLib = file_get_contents($asset[0]);
            //check if the file has been loaded
            if($rawLib != null){
                $lib = json_decode($rawLib, true);
                $targetName = $asset[1];
                //replace every reference with the correct string
                foreach ($lib as $key => $translation){
                    $html = str_replace("[" . $key. "@" . $targetName . "]", $translation, $html);
                }
            }
        }
    }
    return $html;
}

function getAsset(string $language, string $asset): ?array{
    $path = null;
    $targetName = null;
    //check if the file is located elsewhere
    if(str_contains($asset, '@')){
        //here an alternative language library path is used
        $parts = explode('@', $asset);
        if(strlen($parts[0]) > 0 && strlen($parts[1]) > 0){
            //add a / if it is missing
            if(!str_ends_with($parts[1], '/')){
                $parts[1] .= "/";
            }
            //add the final path
            $path = $parts[1] . $language . "/" . $parts[0];
            //add .json extension if necessary
            if(!str_ends_with($path, ".json")){
                $path .= ".json";
            }
            //choose english if the language file does not exist
            if(!file_exists($path)){
                $path = $parts[1] . "en/" . $parts[0];
            }
            $targetName = $parts[0];
        }else{
            return null;
        }
    }else{
        //here the default language library path is used
        $path = "lang/" . $language . "/" . $asset;
        //add .json extension if necessary
        if(!str_ends_with($path, ".json")){
            $path .= ".json";
        }
        //choose english if the language file does not exist
        if(!file_exists($path)){
            $path = "lang/en/" . $asset;
        }
        $targetName = $asset;
    }
    //add .json extension if necessary
    if(!str_ends_with($path, ".json")){
        $path .= ".json";
    }
    return [$path, $targetName];
}
*/