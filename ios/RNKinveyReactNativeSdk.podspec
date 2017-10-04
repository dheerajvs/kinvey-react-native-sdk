
Pod::Spec.new do |s|
  s.name         = "RNKinveyReactNativeSdk"
  s.version      = "1.0.0"
  s.summary      = "RNKinveyReactNativeSdk"
  s.description  = <<-DESC
                  RNKinveyReactNativeSdk
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "chris@dialexa.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/dialexa/kinvey-react-native-sdk.git", :tag => "Realm" }
  s.source_files  = "RNKinveyReactNativeSdk/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "Realm"
  #s.dependency "others"

end

  