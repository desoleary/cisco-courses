package com.example.simple_app;

import java.io.*;
import java.io.File;
/**
 * Hello world!
 *
 */
public class App 
{
	protected  String APP_NAME="com.example.simple-app.App";
	public String inValue = "In";
	public String outValue = "Out";
	public boolean found = false;
	public boolean bound = true;
	public boolean ground = false;
	public boolean hound = true;
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
    }
    public String getAppName() {
    	return APP_NAME;
    }
    public boolean reallyComplexMethod() {
    	if (found && inValue.equals(outValue)) {
    		if (bound) {
    			return true;
    		} else if (!ground){
    			return true;
    		} else if (!hound) {
    			return true;    			
    		}
    		return found;
    	} else if (!found && inValue.equals(outValue)) {
    		if (!ground) {
    			return true;
    		} else if (!bound && inValue.equals(outValue)) {
    			return true;
    		} else if (hound && !ground) {
    			return false;
    		}
    	} else if (!bound) {
    		if (!ground && inValue.equals(outValue)) {
    			return true;
    		} else if (!bound) {
    			return true;
    		} else if (hound && !ground && inValue.equals(outValue)) {
    			return false;
    		}
    	} else {
    		if (!ground && inValue.equals(outValue)) {
    			return true;
    		} else if (!bound) {
    			return true;
    		} else if (hound && !ground && inValue.equals(outValue)) {
    			return false;
    		}
    		
    	}
        return false;
    }
}
